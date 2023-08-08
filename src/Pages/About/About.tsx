function About() {
  return (
    <section className="bg-[#e0dedb] dark:bg-gray-900">
      <div className="mx-auto max-w-screen-md  px-4 py-8 lg:py-16">
        <h2 className="mb-4 text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          À propos de FamiLink, notre projet de fin d&apos;études !
        </h2>
        <p className="mb-4 text-center font-light text-gray-500 dark:text-gray-400 sm:text-xl lg:mb-16">
          Bienvenue sur la page &quot;À propos&quot; du projet FamiLink ! Nous
          sommes une équipe passionnée travaillant sur cette application web
          innovante qui modernise le concept du tableau familial traditionnel.
          Notre objectif est de numériser et de simplifier la communication et
          l&apos;organisation au sein des familles.
        </p>
        <section className="bg-[#e0dedb] dark:bg-gray-900">
          <div className="mx-auto max-w-screen-md px-4 py-8 lg:py-16">
            <div className="rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-800">
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Notre vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Chez FamiLink, notre vision est de faciliter la vie quotidienne
                des familles en leur offrant un moyen simple et efficace de
                rester connectées et organisées. Nous comprenons les défis
                auxquels les familles sont confrontées dans le monde moderne, et
                notre application vise à les aider à gérer leurs tâches, leurs
                événements et leurs communications de manière harmonieuse.
              </p>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Notre objectif
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Notre objectif principal avec ce projet de fin d&apos;études
                était de développer une application conviviale, polyvalente et
                sécurisée pour les familles. Nous voulions créer une plateforme
                où les membres de la famille peuvent collaborer, partager des
                informations et rester synchronisés, le tout au même endroit.
                Nous avons travaillé dur pour concevoir des fonctionnalités
                intuitives, adaptées aux besoins spécifiques des familles, afin
                de simplifier leur quotidien et d&apos;améliorer leur qualité de
                vie.
              </p>
              <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                Notre équipe
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                Notre équipe est composée d&apos;étudiants en informatique
                passionnés par le développement d&apos;applications et
                l&apos;amélioration de l&apos;expérience utilisateur. Chaque
                membre de notre équipe a apporté ses compétences et son
                expertise pour créer une application robuste et convaincante.
                Nous sommes fiers de notre travail et nous espérons que notre
                application FamiLink aura un impact positif sur de nombreuses
                familles à travers le monde.
              </p>
            </div>
          </div>
        </section>
        <div className="rounded-lg bg-gray-50 p-6 shadow-lg dark:bg-gray-800">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Fonctionnalités clés
          </h3>
          <ul className="mb-6 ml-6 list-disc text-gray-700 dark:text-gray-300">
            <li>Créez et gérez des notes familiales</li>
            <li>Liste de courses interactive</li>
            <li>Calendrier familial</li>
            <li>Interface utilisateur conviviale</li>
          </ul>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Équipe du projet
          </h3>
          <ul className="mb-6 ml-6 list-disc text-gray-700 dark:text-gray-300">
            <li>Product Owner: Hugo LAURENT</li>
            <li>Scrum Master: Romain LECONTE</li>
            <li>Lead Dev Front: Michaël Dutheil</li>
            <li>Lead Dev Back: Karim Afroukh</li>
            <li>
              Référent technique (Git Master): Romain LECONTE, Michaël DUTHEIL
            </li>
          </ul>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Comment contribuer
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Nous sommes ravis que vous souhaitiez contribuer à FamiLink ! Vous
            pouvez suivre les étapes suivantes pour contribuer au projet :
          </p>
          <ol className="mb-6 ml-6 list-decimal text-gray-700 dark:text-gray-300">
            <li>Clonez ce dépôt sur votre machine locale.</li>
            <li>
              Créez une branche pour votre fonctionnalité : `git checkout -b
              nom-de-votre-branche`.
            </li>
            <li>Implémentez vos modifications et améliorations.</li>
            <li>Testez soigneusement vos modifications.</li>
            <li>
              Validez vos modifications : `git commit -m &quot;Description des
              modifications&quot;`.
            </li>
            <li>
              Poussez vos modifications vers la branche principale : `git push
              origin nom-de-votre-branche`.
            </li>
            <li>Ouvrez une pull request sur GitHub.</li>
            <li>
              Notre équipe examinera vos modifications et les fusionnera avec la
              branche principale si elles sont validées.
            </li>
          </ol>
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Technologies utilisées
          </h3>
          <ul className="mb-6 ml-6 list-disc text-gray-700 dark:text-gray-300">
            <li>Front-end : HTML, CSS, React, Tailwind, Flowbite</li>
            <li>
              Back-end : NodeJS, Express, JWT, Joi, Swagger, Debug, Winston,
              Bcrypt, Nodemailer, Multer, Cors, Chalk
            </li>
            <li>Base de données : PostgreSQL, Sqitch</li>
          </ul>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Si vous avez des questions supplémentaires sur notre projet de fin
            d&apos;études ou si vous souhaitez en savoir plus, n&apos;hésitez
            pas à nous contacter à l&apos;adresse suivante :{' '}
            <a
              href="mailto:familink.my.project@gmail.com"
              className="text-blue-500 dark:text-blue-300"
            >
              familink.my.projects@gmail.com
            </a>
            .
          </p>
          <ul className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            <li>
              Hugo LAURENT : <a href="https://github.com/HugoLaurent">Github</a>
            </li>
            <li>
              Romain LECONTE : <a href="https://github.com/Devconte">Github</a>
            </li>
            <li>
              Michaël Dutheil :{' '}
              <a href="https://github.com/Michaeldutheil">Github</a>
            </li>
            <li>
              Karim Afroukh : <a href="https://github.com/Karim-Afr">Github</a>
            </li>
          </ul>
          <p className="mt-5 text-center text-gray-700 dark:text-gray-300">
            Nous espérons que vous apprécierez FamiLink autant que nous ! 😀
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
