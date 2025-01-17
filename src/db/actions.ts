'use server'

import { auth } from "@/lib/auth"
import { db } from "./drizzle"
import { resumes } from "./schema"
import { revalidatePath } from "next/cache"
import { eq } from "drizzle-orm"

const getUserIdOrThrow = async () => {
     const session = await auth()

    const userId = session?.user?.id
    if(!userId) throw new Error('User not found.')

        return userId
}

export const createResume = async (title: string ) => {

    const userId = await getUserIdOrThrow()

       const newResume = await db
        .insert(resumes)
        .values({title, userId})
        .returning()

        revalidatePath('/dashboar/resumes')

        return newResume[0]
}

export const updateResumeData = async (id: string, data: ResumeData)  => {
     await getUserIdOrThrow()

        const updateResume = await db
        .update(resumes)
        .set({data, updatedAt: new Date()})
        .where(eq(resumes.id, id))
        .returning()

        revalidatePath('dashboard/resumes')

        return updateResume[0]

}

export const deleteResume = async (id: string) => {
    const userId = await getUserIdOrThrow()

        const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, id)
        })
        
        if(!resume) throw new Error('CV not found!')

            if(resume.userId !== userId) throw new Error('User not authorized!')

                await db.delete(resumes).where(eq(resumes.id, id)).execute()

                 revalidatePath('dashboard/resumes')
}

export const duplicateResume = async (id: string, title: string) => {
    const userId = await getUserIdOrThrow()

            const resume = await db.query.resumes.findFirst({
            where: eq(resumes.id, id)
        })

        if(!resume) throw new Error('CV not found!')

            const newResume = await db
            .insert(resumes)
            .values({
                title,
                userId,
                data: resume.data
            })
            .returning()

            revalidatePath('dashboard/resumes')

            return newResume[0]
}