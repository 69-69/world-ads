// models/Post.ts
//
export class Post {
    id: string;
    title: string;
    description: string;

    constructor(post: Post) {
        this.id = post.id;
        this.title = post.title;
        this.description = post.description;
    }
}
