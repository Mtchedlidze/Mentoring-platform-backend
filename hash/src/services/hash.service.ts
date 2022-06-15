import { pbkdf2, randomBytes } from "crypto";
import { CreateHashDto } from "src/common/dtos/hashDto";

export class HashService {

    async hashWithrandomSalt(password: string): Promise<CreateHashDto> {
        const salt = randomBytes(32).toString('hex')

        return new Promise ((resolve, reject) => {
            pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
                if (err) {
                    reject(err)
                }
                const hash = key.toString('hex')

                resolve({hash, salt})
            })
        })

    }

    async hashWithProvidedSalt(password: string, salt: string): Promise<CreateHashDto> {
        return new Promise ((resolve, reject) => {
            pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
                if (err) {
                    reject(err)
                }
                const hash = key.toString('hex')

                resolve({hash, salt})
            })
        })

    }

}