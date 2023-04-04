const db = require('../db/connection.db').pool

const getCommunities = (req,res) => {

    if (!req.session || !req.session.user) {
        return res.status(401).json("Login is required.")
    }
    const user_id = req.session.user.user_id
    
    const query = `SELECT c.community_id, g.group_name, g.group_description, g.photo 
                    FROM Communities c 
                    INNER JOIN \`Groups\` g 
                    ON c.community_id = g.group_id 
                    LEFT JOIN MemberOf m 
                    ON c.community_id = m.group_id AND m.user_id = ? 
                    WHERE c.visibility = 'public' AND m.user_id IS NULL`
                    
    db.query(query, [user_id], (err,result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(409).json("There are no public communities to join.")
        return res.status(200).json(result.rows)
    })


    /*const communities = [];
    const memberships = [];
    
    // get all public communities
    const qPublicOnly = "SELECT * FROM Communities WHERE visibility = 'public'"
    db.query(qPublicOnly, (err, result1) => {
        if (err) return res.status(500).json(err);
        if (result1.length === 0) return res.status(409).json("There are no public communities to join.")
        const publicCommunities = result1.rows

        const qGetGroupInfo = "SELECT community_id, group_name, group_description, photo FROM ?? LEFT JOIN `Groups` ON ?.community_id = `Groups`.group_id"
        db.query(qGetGroupInfo, [publicCommunities, publicCommunities], (err,result2) => {
        if (err) return res.status(500).json(err);
        communities = result2.rows;
        })
    })

    // get only the MemberOf entries related to the current user
    const qMemberships = "SELECT * FROM MemberOf WHERE user_id = ?"
    db.query(qMemberships, [user_id], (err,result) => {
        if (err) return res.status(500).json(err);
        memberships = result.rows
    }) 

    
    // get only the communities that the current user has not joined
    const qJoin = "SELECT * FROM ?? LEFT JOIN ?? ON ?.community_id = ?.group_id"
    db.query(qJoin, [communities, memberships, communities, memberships], (err,result1) => {
        if (err) return res.status(500).json(err);
 
        const qFilter = "SELECT communities_id, group_name, group_description, photo FROM ?? WHERE group_id IS NULL"
        db.query(qFilter, [result1.rows], (err,result2) => {
            if (err) return res.status(500).json(err);
            if (result2.length === 0) return res.status(409).json("There are no public communities to join.")
            return res.status(200).json(result2.rows);
        })
    })
    */
}


const joinCommunity = (req,res) => {
    //get username of the community creator
    if (!req.session || !req.session.user) {
        return res.status(401).json("Login is required.")
    }
    const user_id = req.session.user.user_id
    
    //join community
    const qJoinGroup = "INSERT INTO MemberOf (group_id, user_id) VALUE (?,?)"
    db.query(qJoinGroup, [req.body.community_id, user_id], (err,data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Successfully joined community.")
    })
}


module.exports = { getCommunities , joinCommunity }