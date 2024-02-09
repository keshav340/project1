
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface CreateUserInput {
    email: string;
    username: string;
    password: string;
}

export interface CategoryInput {
    name: string;
    description: string;
}

export interface Session {
    id: number;
    token: string;
    expiration: DateTime;
}

export interface User {
    id: number;
    email: string;
    username: string;
    password: string;
    role: string;
}

export interface UserType {
    id: number;
    email: string;
    username: string;
    role: string;
}

export interface CategoryType {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
    creator: UserType;
}

export interface LoginResponse {
    access_token: string;
    user: User;
    sessions: Session[];
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(email: string): User | Promise<User>;
    getAllCategories(): CategoryType[] | Promise<CategoryType[]>;
    getCategory(id: number): CategoryType | Promise<CategoryType>;
}

export interface IMutation {
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    logout(sessionId: number): boolean | Promise<boolean>;
    signup(signupUserInput: CreateUserInput): User | Promise<User>;
    create(createUserInput: CreateUserInput): User | Promise<User>;
    createCategory(categoryInput: CategoryInput): CategoryType | Promise<CategoryType>;
    updateCategory(id: number, categoryInput: CategoryInput): CategoryType | Promise<CategoryType>;
    deleteCategory(id: number): boolean | Promise<boolean>;
}

export type DateTime = any;
type Nullable<T> = T | null;
