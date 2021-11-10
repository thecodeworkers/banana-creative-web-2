const aboutPage = (locale) => `
  page: team(locale: "${locale}") {
    aboutHero {
      recapButton {
        text
        Link
      }
      phrase
      date
      paragraph
      title
    }
    TeamGallery {
      fullName
      isImage
      socialMedia {
        url
        name
      }
      socialLink
      picture {
        name
        url
      }
    }
  }
`
export default aboutPage