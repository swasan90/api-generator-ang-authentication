/**
 * Class to define metadata of User
 * @author Swathy Santhoshkumar
 */
export class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    enabled: boolean;
    token: string; 
}
