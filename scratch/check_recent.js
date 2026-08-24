async function getRecent() {
  const gqlQuery = {
    query: `
      query recentAcSubmissions($username: String!, $limit: Int!) {
        recentAcSubmissionList(username: $username, limit: $limit) {
          id
          title
          titleSlug
          timestamp
        }
      }
    `,
    variables: { username: "yuvrajbisht41", limit: 5 }
  };

  const res = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0"
    },
    body: JSON.stringify(gqlQuery)
  });

  const data = await res.json();
  console.log("Recent Submissions for yuvrajbisht41:", JSON.stringify(data, null, 2));
}

getRecent();
