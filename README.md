<!-- NOTE: this readme was based off of https://github.com/othneildrew/Best-README-Template/blob/master/BLANK_README.md -->

<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>


<!-- PROJECT SHIELDS -->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
<!-- These are prob not needed
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/MatthewHilliard/411-Group-22">
    <img src="code/client/src/assets/forkandknife.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Grub Gallery</h3>

  <p align="center">
    Personalized dishes and recipes with the click of a button!
    <br />
    <a href="https://www.youtube.com/watch?v=HiiPeKkUXfM" target= "_blank">View Demo</a>
    ·
    <a href="https://github.com/MatthewHilliard/411-Group-22/issues">Report Bug</a>
    ·
    <a href="https://github.com/MatthewHilliard/411-Group-22/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Grub Gallery][product-screenshot]](https://example.com)

Project description...

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

[![My Skills](https://skillicons.dev/icons?i=git,js,html,tailwind,css,react,vite,mongodb,nodejs,express,figma)](https://skillicons.dev)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you can set up the project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

Please ensure that the following software is installed before cloning the repository:
* npm (you can check the version of `node` you are running with the command `node -v`)
  ```sh
  npm install npm@latest -g
  ```
* Google Cloud Console (please follow these steps from [Google](https://support.google.com/cloud/answer/6158849?hl=en) to initialize your project and obtain a `client ID`)
* MongDB (please follow these steps from [MongoDB](https://www.mongodb.com/docs/compass/current/connect/) to set up your cluster and obtain your cluster `URI`)
* Spoonacular (please follow these steps from [Spoonacular API](https://spoonacular.com/food-api/console#Dashboard) to obtain your Spoonacular `API_KEY`)

### Installation

_To install and run locally, please complete the following steps:_

1. Ensure that your have followed all of the steps from [prerequisites](#prerequisites)
3. Clone the repo
   ```sh
   git clone https://github.com/MatthewHilliard/411-Group-22.git
   ```
4. Create a `.env` file in the `client` directory (paste the following information, filling in the keys from above)
   ```env
   ################ Frontend environment variables ################
   VITE_GOOGLE_CLIENT_ID=secret_client_id_goes_here
   ```
5. Create a `.env` file in the `server` directory (paste the following information, filling in the keys from above)
   ```env
    ################ Backend environment variables ################
    PORT=prefered_port                        # typically 3000
    MONGODB_URI=mongodb_uri_goes_here
    SPOONACULAR_KEY=spoonacular_api_key_goes_here
   ```
6. Install NPM packages (will install packages in `code`, `client`, and `server` directories)
   ```sh
   cd 411-Group-22/code
   npm install
   npm run install-all
   ```
7. Run the application
   ```sh
   cd 411-Group-22/code/server
   npm start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Add Changelog
- [x] Add back to top links
- [ ] Add Additional Templates w/ Examples
- [ ] Add "components" document to easily copy & paste sections of the readme
- [ ] Multi-language Support
    - [ ] Chinese
    - [ ] Spanish

See the [open issues](https://github.com/othneildrew/Best-README-Template/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/your_username) - email@example.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/your_username/repo_name)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Choose an Open Source License](https://choosealicense.com)
* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
* [Malven's Grid Cheatsheet](https://grid.malven.co/)
* [Img Shields](https://shields.io)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/MatthewHilliard/411-Group-22.svg?style=for-the-badge
[contributors-url]: https://github.com/MatthewHilliard/411-Group-22/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/MatthewHilliard/411-Group-22.svg?style=for-the-badge
[forks-url]: https://github.com/MatthewHilliard/411-Group-22/network/members
[stars-shield]: https://img.shields.io/github/stars/MatthewHilliard/411-Group-22.svg?style=for-the-badge
[stars-url]: https://github.com/MatthewHilliard/411-Group-22/stargazers
[issues-shield]: https://img.shields.io/github/issues/MatthewHilliard/411-Group-22.svg?style=for-the-badge
[issues-url]: https://github.com/MatthewHilliard/411-Group-22/issues
[license-shield]: https://img.shields.io/github/license/MatthewHilliard/411-Group-22.svg?style=for-the-badge
[license-url]: https://github.com/MatthewHilliard/411-Group-22/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
