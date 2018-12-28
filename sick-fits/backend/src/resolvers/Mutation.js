const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Mutation = {
	 async createItem(parent, args, ctx, info) {
		// TODO check if they are logged in
		const item = await ctx.db.mutation.createItem({
			data: {
				...args,
			}
		}, info);
    console.log(item);
  return item;
	},
 updateItem(parent, args, ctx, info) {
  //first take a copy of the updates
  const updates = {...args};
  //remove the ID from the updates
  delete updates.id;
  // run the update method
  return ctx.db.mutation.updateItem({
   data: updates,
   where: { 
    id: args.id,
    },
   },
   info
  );
 },
async deleteItem(parent, args, ctx, info) {
  const where = { id: args.id };
  // 1 finde the item
  const item = await ctx.db.query.item({ where }, `{ id title}`);
  // 2 check if they own that item, or have the perms
 //TODO 
  // 3 delete it 
  return ctx.db.mutation.deleteItem({ where }, info);
 },
 async signup(parent, args, ctx, info) {
  args.email = args.email.toLowerCase();
  const password = await bcrypt.hash(args.password, 10);
  const user = await ctx.db.mutation.createUser({
    data: {
      ...args,
      password,
      permissions: {set: ['USER']},
    },
  }, info);
  const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);
  ctx.response.cookie('token', token, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 *24 * 365,
  });
  return user;
 },
 async signin( parent, { email, password }, ctx, info ) {
    //check if theres is a user with that email
    const user = await ctx.db.query.user({where: { email }});
    if ( !user ) {
      throw new Error(`No such user found for that email ${email}`);
    }
    const valid = await bcrypt.compare(password, user.password);
    if ( !valid ) {
      throw new Error('Invalid Password!');
    }
    const token = jwt.sign({ userId: user.id}, process.env.APP_SECRET);

    ctx.response.cookie('token', token, {
      hhttOnly: true,
      maxAge: 1000*60*60*24*365,
    });
    return user;
    // check pw is correct
    // generate the jwt
    // set the cookie with the token
    // return the User
 }
};

module.exports = Mutation;
