const GITHUB_END_POINT = 'https://api.github.com';

async function api(endpoint: string, opts: RequestInit) {
  const endLink = `${GITHUB_END_POINT}${endpoint}`;
  return await fetch(endLink, opts);
}

async function getCommits() {
  const response = await api('/repos/dennis0324/dotfiles/commits', {
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  // const response = await fetch(
  //   `${GITHUB_END_POINT}/repos/dennis0324/dotfiles/commits`,
  //   {
  //     headers: {
  //       'X-GitHub-Api-Version': '2022-11-28',
  //     },
  //   }
  // );

  const data = await response.json();
  console.log(data);
}

export { getCommits };
