1.Comment-schema 
 by:String,------->Author of the comment
 kids:[Number]----->Reply to the comment
 parent:Number,---->Main comment belong to the topic
 text:String,------>actual comment
 id:Number--------->id for comment
Addcomment.js
	=>get comments with parent id as params(get/:id)
	=>post comments
	=>get comment with id for nested comment

2.Post-schema

   by:String,---------->Author of the post
    kids:[Number],------>comments
    score:Number,-------->total comments
    title:String,--------->topic
    desc:String,---------->description of the comment
    id:Number,-------------> id for the post
Addpost.js
	=>get post details with kids,kids are comments id
	=>post the discussion with title and description
	 =>Whenever add comment to post,put api is call to update the data by pushing comment id into the kids

3.User -schema

    username:String,   ---------> User Name of the account
    email:String,	     ---------> Email ID of the account
    salt:String,	     ---------> Salt key which is added with password to encrypt
    password:String    ---------> encrypted password of the account

adduser.js
	=>get user data,encrypet the password and register the user in database
	=> verify the passed user data with the database