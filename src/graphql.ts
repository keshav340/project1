
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

export interface PostInput {
    title: string;
    description: string;
    content: string;
    categoryId: number;
    subcategoryIds?: Nullable<number[]>;
    tagIds?: Nullable<number[]>;
    metaId?: Nullable<number>;
    metaTitle?: Nullable<string>;
    metaDescription?: Nullable<string>;
}

export interface CreateCommentInput {
    text: string;
    postId: number;
    username: string;
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

export interface Comment {
    id: string;
    text: string;
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

export interface LoginResponse {
    access_token: string;
    user: User;
    sessions: Session[];
}

export interface TagType {
    id: string;
    name: string;
}

export interface MetaType {
    id: string;
    metaTitle?: Nullable<string>;
    metaDescription?: Nullable<string>;
}

export interface PostType {
    id: string;
    title: string;
    description: string;
    content: string;
    subcategories?: Nullable<SubcategoryType[]>;
    tags?: Nullable<TagType[]>;
    meta?: Nullable<MetaType>;
    categories: CategoryType[];
    views: number;
}

export interface IQuery {
    users(): User[] | Promise<User[]>;
    user(email: string): User | Promise<User>;
    getAllCategories(): CategoryType[] | Promise<CategoryType[]>;
    getCategory(id: number): CategoryType | Promise<CategoryType>;
    getSubcategoryById(id: number): SubcategoryType | Promise<SubcategoryType>;
    getAllTags(): Tag[] | Promise<Tag[]>;
    getAllMeta(): Meta[] | Promise<Meta[]>;
    getMetaById(id: number): Meta | Promise<Meta>;
    getPostById(id: number): PostType | Promise<PostType>;
    getAllPosts(): PostType[] | Promise<PostType[]>;
    getPostsByTitle(title: string): PostType[] | Promise<PostType[]>;
    getPostsByCategory(categoryId: number): PostType[] | Promise<PostType[]>;
    getPostsByTag(tagId: number): PostType[] | Promise<PostType[]>;
}

export interface IMutation {
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    logout(sessionId: number): boolean | Promise<boolean>;
    signup(signupUserInput: CreateUserInput): User | Promise<User>;
    create(createUserInput: CreateUserInput): User | Promise<User>;
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
    createPost(postData: PostInput): PostType | Promise<PostType>;
    deletePost(id: number): boolean | Promise<boolean>;
    updatePost(id: number, postData: PostInput): PostType | Promise<PostType>;
    incrementViews(postId: number): PostType | Promise<PostType>;
    createComment(commentInput: CreateCommentInput): Comment | Promise<Comment>;
}

export type DateTime = any;
type Nullable<T> = T | null;
