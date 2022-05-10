export default {
  widgets: [
      {
      name: 'netlify',
      options: {
        title: 'My Netlify deploys',
        sites: [
          {
            apiId: process.env.SANITY_STUDIO_NETLIFY_API_ID,
            buildHookId: process.env.SANITY_STUDIO_NETLIFY_BUILD_HOOK_ID,
            name: 'shimmering-cendol-2e9873',
          }
        ]
      }
    }
  ]
}