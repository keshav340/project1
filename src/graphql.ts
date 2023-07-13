
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SearchPostsInput {
    title?: Nullable<string>;
    categoryId?: Nullable<number>;
    tags?: Nullable<string[]>;
}

export interface CategoryInput {
    name: string;
    description: string;
}

export interface CreateSubcategoryInput {
    name: string;
    description: string;
    categoryId: number;
}

export interface UpdateSubcategoryInput {
    id: number;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface CreateUserInput {
    email: string;
    username: string;
    password: string;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

export interface CreatePostInput {
    title: string;
    description: string;
    content: string;
    categoryIds: number[];
    subcategoryIds: number[];
    tagIds: number[];
    metaTitle: string;
    metaDescription: string;
}

export interface UpdatePostInput {
    id: number;
    title?: Nullable<string>;
    description?: Nullable<string>;
    content?: Nullable<string>;
    categoryIds?: Nullable<number[]>;
    subcategoryIds?: Nullable<number[]>;
    tagIds?: Nullable<number[]>;
    metaTitle?: Nullable<string>;
    metaDescription?: Nullable<string>;
}

export interface CategoryType {
    id: string;
    name?: Nullable<string>;
    description?: Nullable<string>;
}

export interface SubcategoryType {
    id: number;
    name: string;
    description: string;
    category: CategoryType;
}

export interface Tag {
    id: string;
    name: string;
}

export interface CreateTagResponse {
    tag: Tag;
}

export interface UpdateTagResponse {
    tag: Tag;
}

export interface DeleteTagResponse {
    success: boolean;
}

export interface Meta {
    id: string;
    metaTitle: string;
    metaDescription?: Nullable<string>;
}

export interface CreateMetaResponse {
    meta: Meta;
}

export interface UpdateMetaResponse {
    meta: Meta;
}

export interface DeleteMetaResponse {
    success: boolean;
}

export interface User {
    username: string;
    email: string;
    role: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface Post {
    id: string;
    title: string;
    description: string;
    content: string;
}

export interface IQuery {
    getAllCategories(): CategoryType[] | Promise<CategoryType[]>;
    getCategory(id: number): CategoryType | Promise<CategoryType>;
    getSubcategoryById(id: number): SubcategoryType | Promise<SubcategoryType>;
    getAllTags(): Tag[] | Promise<Tag[]>;
    getAllMeta(): Meta[] | Promise<Meta[]>;
    getMetaById(id: number): Meta | Promise<Meta>;
    users(): User[] | Promise<User[]>;
    user(email: string): User | Promise<User>;
    getPostById(id: string): Post | Promise<Post>;
    getAllPosts(): Post[] | Promise<Post[]>;
    searchPosts(input: SearchPostsInput): Post[] | Promise<Post[]>;
}

export interface IMutation {
    createCategory(categoryInput: CategoryInput): CategoryType | Promise<CategoryType>;
    updateCategory(id: number, categoryInput: CategoryInput): CategoryType | Promise<CategoryType>;
    deleteCategory(id: number): boolean | Promise<boolean>;
    createSubcategory(subcategoryInput: CreateSubcategoryInput): SubcategoryType | Promise<SubcategoryType>;
    updateSubcategory(updateSubcategoryInput: UpdateSubcategoryInput): SubcategoryType | Promise<SubcategoryType>;
    deleteSubcategory(id: number): boolean | Promise<boolean>;
    createTag(name: string): CreateTagResponse | Promise<CreateTagResponse>;
    updateTag(id: number, name?: Nullable<string>): UpdateTagResponse | Promise<UpdateTagResponse>;
    deleteTag(id: number): DeleteTagResponse | Promise<DeleteTagResponse>;
    createMeta(metaTitle: string, metaDescription?: Nullable<string>): CreateMetaResponse | Promise<CreateMetaResponse>;
    updateMeta(id: number, metaTitle?: Nullable<string>, metaDescription?: Nullable<string>): UpdateMetaResponse | Promise<UpdateMetaResponse>;
    deleteMeta(id: number): DeleteMetaResponse | Promise<DeleteMetaResponse>;
    create(createUserInput: CreateUserInput): User | Promise<User>;
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    signup(signupUserInput: CreateUserInput): User | Promise<User>;
    createPost(post: CreatePostInput): Post | Promise<Post>;
    updatePost(post: UpdatePostInput): Post | Promise<Post>;
    deletePost(id: string): boolean | Promise<boolean>;
}

type Nullable<T> = T | null;
