import React from 'react'

const PostContent = ({ post }) => {
    return (
        post.content.split("\n").map((paragraph, index) => (
            <p
                key={index}
                className="text-2xl leading-9 mb-6 text-(--secondary) font-semibold"
            >
                {paragraph}
            </p>
        ))
    )
}

export default PostContent