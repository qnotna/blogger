export interface PostRequestBody {
    title: string;
    content: string;
}

export interface DeleteRequestBody {
    blogId: string;
    postId: string;
};