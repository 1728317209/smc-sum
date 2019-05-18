/* eslint-disable no-bitwise */
import { BigInteger } from 'jsbn'; // jsbn是一个快速、便捷的大整数库，纯JavaScript实现，
import sjcl from 'sjcl'; // 斯坦福JavaScript加密库，是一个由斯坦福大学计算机安全实验室创立的项目，旨在创建一个安全、快速、短小精悍、易使用、跨浏览器的JavaScript加密库

const Paillier = ((() => {
  // 生成大随机数
  const random = (bitLength) => {
    const wordLength = bitLength / 4 / 8;
    const randomWords = sjcl.random.randomWords(wordLength);
    const randomHex = sjcl.codec.hex.fromBits(randomWords);
    return new BigInteger(randomHex, 16);
  };

  // 定义paillier对象
  const paillier = {
  // 生成p、q、n
    generateKeys(keySize) {
      let p;
      let q;
      let n;
      let lambda;
      while (true) {
        do {
          p = random(keySize >> 1);
        } while (!p.isProbablePrime(10)); // 测试是否是大素数

        do {
          q = random(keySize >> 1);
        } while (!q.isProbablePrime(10)); // 测试是否是大素数

        n = p.multiply(q); // n = pq
        const p1 = p.subtract(BigInteger.ONE); // p - 1
        const q1 = q.subtract(BigInteger.ONE); // q - 1
        lambda = p1.multiply(q1); // λ = (p-1)(q-1)
        if (!n.gcd(p1.multiply(q1)).compareTo(BigInteger.ONE)) break; // gcd(pq,(p−1)(q−1)) = 1 保证两个质数长度相等
      }
      return new this.Keypair(keySize, n, lambda);
    },

    // 生成密钥
    Keypair(keySize, n, lambda) {
      this.pub = new paillier.PublicKey(keySize, n);
      if (lambda) this.sec = new paillier.PrivateKey(lambda, this.pub);
    },

    // 生成公钥
    PublicKey(keySize, n) {
      if (keySize % 2 !== 0) throw new Error('Keysize should be even.');
      this.keySize = keySize;
      this.n = n;
      this.n2 = n.square();
      this.g = n.add(BigInteger.ONE); // g = n + 1
    },

    // 生成私钥
    PrivateKey(lambda, pubKey) {
      this.lambda = lambda;
      this.pubKey = pubKey;
      // const u = pubKey.g.modPow(this.lambda, pubKey.n2); // u = g^lambda mod n^2
      // this.mu = this.pubKey.L(u).modInverse(pubKey.n); // mu = 1 / (L(g^lambda mod n^2) % n)
      this.mu = lambda.modInverse(pubKey.n);
      if (this.mu.toString() === '0') {
        throw new Error('Error: n does not divide order of g');
      }
    },

    PublicKeyPrototype: {
      encrypt(m) {
        m = this.convertToBn(m);
        // 因为：(n + 1)^m ≡ n*m + 1 % n^2
        // 所以：g^m % n^2 = (n + 1)^m % n^2 = (n * m + 1) % n^2
        const gm = this.n.multiply(m).add(BigInteger.ONE).mod(this.n2);
        const rn = this.generateRn();
        return gm.multiply(rn).mod(this.n2);
      },
      mult(a, b) { // (a * b) % n^2
        return a.multiply(b).remainder(this.n2);
      },
      L(x) { // L(x) = (x -1) / n
        return x.subtract(BigInteger.ONE).divide(this.n);
      },
      generateRn() { // 生成随机数r，0 < r < n
        let r;
        do {
          r = random(this.keySize);
        } while (r.compareTo(this.n) >= 0);
        return r.modPow(this.n, this.n2); // r^n mod n^2
      },
      convertToBn(m) {
        if (typeof m === 'string') {
          m = new BigInteger(m);
        } else if (m.constructor !== BigInteger) {
          m = new BigInteger(parseInt(m, 10).toString());
        }
        return m;
      },
    },

    PrivateKeyPrototype: {
      decrypt(c) {
        const x = this.pubKey.L(c.modPow(this.lambda, this.pubKey.n2)); // L(c^lambda % n^2)
        const m = x.multiply(this.mu).mod(this.pubKey.n); // m = L(c^lambda % n^2) * mu % n
        return m;
      },
    },
  };

  paillier.PublicKey.prototype = paillier.PublicKeyPrototype;
  paillier.PrivateKey.prototype = paillier.PrivateKeyPrototype;
  return paillier;
}))();

export default Paillier;
