const usernames = ['yuvraj249', 'yuvrajbisht41', 'yuvrajbisht', 'yuvraj-bisht', 'yuvraj_bisht', 'yuvrajbisht249', 'yuvraj_249'];

async function testLeetCode() {
  for (const u of usernames) {
    try {
      const gqlQuery = {
        query: `
          query userProblemsSolved($username: String!) {
            matchedUser(username: $username) {
              username
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
              profile {
                ranking
              }
            }
          }
        `,
        variables: { username: u }
      };

      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        },
        body: JSON.stringify(gqlQuery)
      });

      const data = await res.json();
      if (data.data?.matchedUser) {
        console.log("MATCHED LEETCODE USER:", u);
        console.log(JSON.stringify(data.data.matchedUser, null, 2));
      } else {
        console.log("Not found:", u);
      }
    } catch (err) {
      console.error("Error for", u, err.message);
    }
  }
}

testLeetCode();
