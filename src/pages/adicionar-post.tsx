import { zodResolver } from '@hookform/resolvers/zod'
import PocketBase from 'pocketbase'
import React from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
    files: z.any(),
})

const pb = new PocketBase('http://127.0.0.1:8090')

type FormValues = z.infer<typeof schema>

function AdcionarPost() {
    const { register, handleSubmit, reset } = useForm<FormValues>({
        resolver: zodResolver(schema),
    })

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const formData = new FormData()

        formData.append('title', data.title)
        formData.append('content', data.content)
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        formData.append('thumbnail', data.files[0] as Blob)

        await pb.collection('posts').create(formData)

        reset()
    }

    return (
        <main className="flex flex-col items-center">
            <form
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
            >
                <label className="flex flex-col gap-2">
                    Título
                    <input
                        className="border border-slate-700 p-2"
                        {...register('title')}
                        type="text"
                    />
                </label>
                <label className="flex flex-col gap-2">
                    Conteúdo
                    <input
                        className="border border-slate-700 p-2"
                        {...register('content')}
                        type="text"
                    />
                </label>

                <label className="flex flex-col gap-2">
                    Arquivos
                    <input
                        className="border border-slate-700 p-2"
                        {...register('files')}
                        type="file"
                    />
                </label>

                <button className="bg-indigo-400 p-4 hover:bg-indigo-700">
                    Enviar
                </button>
            </form>
        </main>
    )
}

export default AdcionarPost
