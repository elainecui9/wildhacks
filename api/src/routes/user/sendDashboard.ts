import { Request, Response } from 'express'
import { User, UserDashboard } from '../../models/User'
import { Article, ArticlePreview } from '../../models/Article'
import { Folder, FolderInterface } from '../../models/Folder'
import { Class, ClassPreview } from '../../models/Class'

export const sendDashboard = async (req: Request, res: Response) => { 
    try {
        const payload = req.body.payload
        const user = await User.findById(payload._id)
        const articlesData = await Article.find({
            "_id": {
                $in: user!.articles
            }
        })
        const foldersData = await Folder.find({
            "_id": {
                $in: user!.folders
            }
        })
        const classesData = await Class.find({
            "_id": {
                $in: user!.classes
            }
        })
        const articles: ArticlePreview[] = articlesData.map((article) => {
                return {
                    _id: article._id,
                    title: article.title,
                    date: article.date
                }
        })
        const classes: ClassPreview[] = classesData.map((iter) => {
            return {
                _id: iter._id,
                name: iter.name,
                date: iter.date,
                owner: iter.owner
            }
        })
        const folders: FolderInterface[] = await Promise.all(foldersData.map(async (folder) => {
            const articles = await Article.find({
            "_id": {
                $in: folder.articles
                }
            })
            const articlePreviews: ArticlePreview[] = articles.map((article) => {
                return {
                    _id: article._id,
                    title: article.title,
                    date: article.date
                }
            })
            return {
                _id: folder._id,
                name: folder.name,
                color: folder.color,
                date: folder.date,
                articles: articlePreviews
            }
        }))
        const data: UserDashboard = {
            _id: user!._id,
            firstName: user!.firstName,
            lastName: user!.lastName,
            email: user!.email,
            folders: folders,
            articles: articles,
            classes: classes
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send(error)
    }
}