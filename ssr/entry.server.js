const [pending, resolved, fulfilled] = ["pending", "fulfilled", "rejected"];

class myPromise {
  #PromiseState = pending;
  #PromiseResult = undefined;
  #hendler = [];
  constructor(executor) {
    const resolve = (data) => {
      this.#changeState(data, resolved);
    };
    const reject = (err) => {
      this.#changeState(err, fulfilled);
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  #changeState(PromiseResult, PromiseState) {
    if (this.#PromiseState !== pending) return;
    this.#PromiseResult = PromiseResult;
    this.#PromiseState = PromiseState;
    this.#run();
  }
  #isPromise(value) {
    if (value && (typeof value === "object" || typeof value === "function")) {
      return typeof value.then === "function";
    }
    return false;
  }
  #nextTick(fn) {
    if (typeof process === "object" && typeof process.#nextTick === "function") {
      process.#nextTick(fn);
    } else if (typeof MutationObserver === "function") {
      const ab = new MutationObserver(fn);
      const textNode = document.createTextNode("1");
      ab.observe(textNode, {
        characterData: true
      });
      textNode.data = "2";
    } else {
      setTimeout(fn, 0);
    }
  }
  #runOne(callback, resolve, reject) {
    this.#nextTick(() => {
      if (typeof callback !== "function") {
        const fn = this.#PromiseState === resolved ? resolve : reject;
        return fn(this.#PromiseResult);
      }
      try {
        const data = callback(this.#PromiseResult);
        if (this.#isPromise(data)) {
          data.then(resolve, reject);
        } else {
          resolve(data);
        }
      } catch (error) {
        reject(error);
      }
    });
  }
  #run() {
    if (this.#PromiseState === pending) return;
    while (this.#hendler.length) {
      const { onResolve, onReject, resolve, reject } = this.#hendler.shift();
      if (this.#PromiseState === resolved) {
        this.#runOne(onResolve, resolve, reject);
      } else {
        this.#runOne(onReject, resolve, reject);
      }
    }
  }

  then(onResolve, onReject) {
    return new myPromise((resolve, reject) => {
      this.#hendler.push({ onResolve, onReject, resolve, reject });
      this.#run();
    });
  }
  catch(onReject) {
    this.then(undefined, onReject);
  }
  finally(onFinally) {
    this.then((data) => {
      onFinally();
      return data;
    }).catch((err) => {
      onFinally();
      throw err;
    });
  }
  static resolve(value) {
    if (value instanceof myPromise) return value;
    let _resolve, _reject;
    const p = new myPromise((res, rej) => {
      _resolve = res;
      _reject = rej;
    });
    if (p.#isPromise(value)) {
      value.then(_resolve, _reject);
    } else {
      _resolve(value);
    }
    return p;
  }
  static reject(value) {
    return new myPromise((resolve, reject) => {
      reject(value);
    });
  }
}

const p = myPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(12);
  }, 2000);
});

const thenP = p.then((res) => {
  console.log(res);
});

myPromise
  .resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve(4);
  })
  .then((res) => {
    console.log(res);
  });

myPromise
  .resolve()
  .then(() => {
    console.log(1);
  })
  .then(() => {
    console.log(2);
  })
  .then(() => {
    console.log(3);
  })

  .then(() => {
    console.log(5);
  })

  .then(() => {
    console.log(6);
  });
