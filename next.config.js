module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/facebook",
        destination: "https://www.facebook.com/carl.pahuyo",
        permanent: false,
      },
      {
        source: "/twitter",
        destination: "https://twitter.com/carledwardfp",
        permanent: false,
      },
      {
        source: "/github",
        destination: "https://github.com/official-carledwardfp",
        permanent: false,
      },
      {
        source: "/linkedin",
        destination: "https://www.linkedin.com/in/carlpahuyo",
        permanent: false,
      },
    ]
  },
}
