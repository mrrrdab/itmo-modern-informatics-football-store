import { createHash, randomBytes } from 'crypto';

class CryptoProvider {
  public async hashStringBySHA256(str: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const hash = createHash('sha256');
        hash.update(str);
        resolve(hash.digest('hex'));
      }
      catch(err) {
        reject(err);
      }
    });
  }

  public generateSecureVerificationToken(): string {
    return randomBytes(64).toString('hex');
  }
}
export default CryptoProvider;
