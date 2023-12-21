const post = require('../models/post')

const postController = {
    createPost: async (request, response) => {
        try {
            const userId = await request.userId
            //    console.log(userId)
            const { title, description } = await request.body
            // console.log(description)
            const posts = new post({
                title,
                description,
                user: userId
            });
            // console.log(posts)
            await posts.save();

            return response.status(200).json({ message: "post created successfully", post })
        } catch (error) {
            // console.log('post')
            return response.send(error)

        }
    }
}

module.exports = postController