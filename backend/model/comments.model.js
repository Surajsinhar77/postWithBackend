const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({
	
	commentInfo : {
		type : String,
		required : true,
	},

	like : {
		type : Number,
		default : 0
	},

	user : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'User',
		required : true,
	},

	post : {
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Post',
		required : true,
	},

	children : [{
		type : mongoose.Schema.Types.ObjectId,
		ref : 'Comment',
	}]

}
, { timestamps: true }
);

// inner model middleware
commentsSchema.pre('remove', async function(next) {
    try {
        // Get IDs of children comments
        const childrenIds = this.children;

        // Remove the parent comment
        await this.model('Comment').deleteOne({ _id: this._id });

        // Remove children comments, if any
        if (childrenIds && childrenIds.length > 0){
            await this.model('Comment').deleteMany({ _id: { $in: childrenIds } });
        }

        next();
    } catch (err) {
        next(err);
    }
});

const commentModel = mongoose.model('Comment', commentsSchema);

module.exports = commentModel;