
// Polyfill for Function.prototype.call
if (!Function.prototype.call) {
    // eslint-disable-next-line no-extend-native
    Function.prototype.call = function (context: any, ...args: any[]) {
        if (typeof this !== 'function') {
            throw new Error('context must be a function');
        }
        
        context = context || globalThis;
        context.fn = this;
        const result = context.fn(...args);
        delete context.fn;
        return result;
    };
}
if (!Function.prototype.apply) {
    // eslint-disable-next-line no-extend-native
    Function.prototype.apply = function (context: any, args: any[]) {
        if(typeof this !== 'function') {
            throw new Error('context must be a function')
        }
        
        context = context || globalThis;
        context.fn = this
        const result = context.fn(...args)
        delete context.fn
        return result
    }
}
if (!Function.prototype.bind) {
    // eslint-disable-next-line no-extend-native
    Function.prototype.bind = function (context: any, ...args: any[]) {
        if(typeof this !== 'function') {
            throw new Error('context must be a function')
        }
        let bind = this
       return function(this: any, ...args2: any[]) {
        return bind.apply(context, args.concat(args2))
       }
    }
}
if (!Array.prototype.map) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.map = function (callback: any, thisArg?: any) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function')
        }
          let result = []
          for(let i = 0; i < this.length; i++) {
            let value = callback.call(thisArg, this[i], i, this)
            result.push(value)
          }
          return result
       }
    }
if (!Array.prototype.filter) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.filter = function (callback: any, thisArg?: any) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function')
        }
        let result = []
        for(let i = 0; i < this.length; i++) {
            let value = callback.call(thisArg, this[i], i, this)
            if(value) {
                result.push(this[i])
            }
        }
        return result
    }
}
if (!Array.prototype.reduce) {
    // eslint-disable-next-line no-extend-native
    Array.prototype.reduce = function (callback: any, initialValue?: any) {
        if(typeof callback !== 'function') {
            throw new Error('callback must be a function')
        }
        let curr = initialValue
        let i = 0
        if(initialValue === undefined) {
            curr = this[0]
            i++
        }
        for (let x = i ; x < this.length; x++) {
            curr = callback(curr,this[x],x,this)
        }
        return curr
    }
}

export function debounce(fn: any, delay: any) {
    let timer : any
    return function(this: any, ...args: any[]) {
        if(timer){
            clearTimeout(timer)
        }
        timer =setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

export function throttle(fn: any, delay: any) {
    let lastCall = 0
    return function (this: any, ...args: any[]){
      let now  = new Date().getTime()
      let remaining = delay -(now-lastCall)
      if(remaining <= 0) {
        lastCall = now
        fn.apply(this , args)
      }
    }
}

export function memoize(fn: any) {
    let cache = new Map()
    return function (this : any , ...args: any[]) {
        let key = JSON.stringify(args)
        if(cache.has(key)) {
            return cache.get(key)
        }
        let result = fn.apply(this, args)
        cache.set(key, result)
        return result
    }
}

// Promise.all polyfill
if (!Promise.all) {
    (Promise as any).all = function(promises: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            if (promises.length === 0) {
                resolve([]);
                return;
            }
            
            let result: any[] = [];
            let completed = 0;
            
            for(let i = 0; i < promises.length; i++) {
                // eslint-disable-next-line no-loop-func
                Promise.resolve(promises[i]).then((res: any) => {
                    result[i] = res;
                    completed++;
                    if (completed === promises.length) {
                        resolve(result);
                    }
                }).catch((err: any) => {
                    reject(err);
                });
            }
        });
    };
}
