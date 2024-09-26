import { v4 as uuidv4 } from 'uuid';

export default function generateRandomEmail(): string {
    const emailPrefix = 'michael.krasnovskyi+aqa-user';
    const domain = 'gmail.com';
    const uuid = uuidv4().substr(0, 8);
    return `${emailPrefix}${uuid}@${domain}`;

}
