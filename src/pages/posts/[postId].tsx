import type { GetStaticProps } from 'next'
import Image from 'next/image'
import PocketBase from 'pocketbase'

import type { Post } from '@/types'

const pb = new PocketBase('http://127.0.0.1:8090')

function MeuPost({ post }: { post: Post }) {
    return (
        <div className="flex flex-col gap-8 px-12">
            <div className="flex flex-col gap-2 px-4">
                <h1>{post.title}</h1>
                <Image
                    alt="ALF"
                    height={500}
                    src={`http://127.0.0.1:8090/api/files/posts/${post.id}/${post.thumbnail}`}
                    width={500}
                />
            </div>

            <p>{post.content}</p>
        </div>
    )
}

export default MeuPost

export const getStaticPaths = async () => {
    const posts = await pb.collection('posts').getList<Post>(1, 2, {
        sort: 'created',
    })

    return {
        paths: posts.items.map((post) => ({
            params: {
                postId: post.id,
            },
        })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postId = params?.postId as string

    const post = await pb.collection('posts').getOne<Post>(postId)

    return {
        props: {
            post: structuredClone(post),
        },
        revalidate: 60,
    }
}
