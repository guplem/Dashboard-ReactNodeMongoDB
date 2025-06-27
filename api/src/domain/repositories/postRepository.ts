import { Post } from "../models/post";

export interface PostRepository {
  /**
   * Retrieves a list of posts with sorting, range, and filter options.
   * @param sort - Array of sorting options, e.g., ["title","ASC"].
   * @param range - Array defining the range of items, e.g., [0, 24].
   * @param filter - Object containing filter criteria, e.g., {"title":"bar"}.
   * @returns A promise that resolves to an object containing the posts and the total count.
   */
  getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ posts: Post[]; total: number }>;
  /**
   * Retrieves a single post by its ID.
   * @param id - The ID of the post, e.g., "507f1f77bcf86cd799439011"
   * @returns A promise that resolves to the post.
   */
  getOne(id: string): Promise<Post>;

  /**
   * Retrieves multiple posts based on filter criteria.
   * @param filter - Object containing filter criteria, e.g., {"ids":["507f1f77bcf86cd799439011","507f1f77bcf86cd799439012"]}.
   * @returns A promise that resolves to an array of posts.
   */
  getMany(filter: { [key: string]: any }): Promise<Post[]>;

  /**
   * Retrieves multiple posts based on reference filter criteria.
   * @param filter - Object containing reference filter criteria, e.g., {"author_id":"507f1f77bcf86cd799439013"}.
   * @returns A promise that resolves to an array of posts.
   */
  getManyReference(filter: { [key: string]: any }): Promise<Post[]>;

  /**
   * Creates a new post.
   * @param post - The post data to create.
   * @returns A promise that resolves to the created post.
   */
  create(post: Post): Promise<Post>;

  /**
   * Updates a post by its ID.
   * @param id - The ID of the post, e.g., "507f1f77bcf86cd799439011"
   * @param post - The post data to update.
   * @returns A promise that resolves to the updated post.
   */
  update(id: string, post: Post): Promise<Post>;

  /**
   * Deletes a post by its ID.
   * @param id - The ID of the post, e.g., "507f1f77bcf86cd799439011"
   * @returns A promise that resolves when the post is deleted.
   */
  delete(id: string): Promise<void>;
}
