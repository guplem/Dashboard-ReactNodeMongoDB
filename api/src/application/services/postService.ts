import { Post } from "../../domain/models/post";
import { PostRepository } from "../../domain/repositories/postRepository";

export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  create(postData: { [key: string]: any }): Promise<Post> {
    return this.postRepository.create(postData as Post);
  }

  getList(sort: string[], range: number[], filter: { [key: string]: any }): Promise<{ posts: Post[]; total: number }> {
    return this.postRepository.getList(sort, range, filter);
  }
  getOne(id: number | string): Promise<Post> {
    return this.postRepository.getOne(id as string);
  }

  getMany(filter: { [key: string]: any }): Promise<Post[]> {
    return this.postRepository.getMany(filter);
  }

  getManyReference(filter: { [key: string]: any }): Promise<Post[]> {
    return this.postRepository.getManyReference(filter);
  }

  update(id: number | string, post: Post): Promise<Post> {
    return this.postRepository.update(id as string, post);
  }

  delete(id: number | string): Promise<void> {
    return this.postRepository.delete(id as string);
  }
}
