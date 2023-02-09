import type { InferGetServerSidePropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PocketBase from 'pocketbase'

import type { Post } from '@/types'

const pb = new PocketBase('http://127.0.0.1:8090')

export default function Home({
    posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <>
            {posts.items.map((post) => (
                <>
                    <h1 className="text-lg font-bold">{post.title}</h1>
                    <Link key={post.id} href={`/posts/${post.id}`}>
                        <Image
                            alt="ALF"
                            height={500}
                            src={`http://127.0.0.1:8090/api/files/posts/${post.id}/${post.thumbnail}`}
                            width={500}
                        />
                    </Link>
                    <button
                        className={`${
                            post.favorite ? 'bg-red-500' : 'bg-emerald-700'
                        } p-2`}
                        onClick={() => {
                            pb.collection('posts').update(post.id, {
                                favorite: !post.favorite,
                            })
                        }}
                    >
                        Favoritar
                    </button>
                </>
            ))}
        </>
    )
}

export const getServerSideProps = async () => {
    const posts = await pb.collection('posts').getList<Post>(1, 10)

    return {
        props: {
            posts: structuredClone(posts),
        },
    }
}
