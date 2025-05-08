import { Code, Database } from 'lucide-react';

export default function Expertise() {
  const cards = [
    {
      icon: <Code />,
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern frameworks.",
      languages: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "Typescript",
        "Javascript",
      ]
    },
    {
      icon: <Database />,
      title: "Backend Development",
      description: "Building robust server-side applications and APIs for seamless data flow.",
      languages: [
        "Java",
        "Spring Boot",
        "Node.js",
        "SQL"
      ]
    },
  ]

  return (
    <section id="skills" className=" px-4 sm:px-6 rounded-xl sm:rounded-2xl md:rounded-3xl">
      <div className='bg-muted/50 rounded-xl sm:rounded-2xl md:rounded-3xl py-12 sm:py-16 md:py-20 px-2 sm:px-6'>
      <div className='text-center mb-8 sm:mb-12'>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Technical Expertise</h1>
        <p className="text-muted-foreground text-sm sm:text-base max-w-xl sm:max-w-2xl mx-auto">With a strong foundation in multiple programming languages and frameworks, I build robust and scalable applications.</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {cards.map((props, index) => (
          <div 
            key={index} 
            className="text-left cursor-pointer flex flex-col gap-3 sm:gap-4 p-6 sm:p-8 rounded-lg sm:rounded-xl bg-background/50 backdrop-blur-sm hover:shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-1 duration-300 animate-fade-in"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className="bg-primary/20 text-primary p-3 sm:p-4 rounded-lg mb-2 sm:mb-4 w-fit">
              {props.icon}
            </div>
            <h2 className="text-lg sm:text-xl font-semibold">{props.title}</h2>
            <p className="text-muted-foreground text-sm sm:text-base">{props.description}</p>
            <div className="flex flex-wrap gap-2 mt-auto pt-2">
              {props.languages.map((language, index) => (
                <span 
                  key={index} 
                  className="bg-secondary/10 text-secondary rounded-full px-2 py-1 text-xs sm:text-sm"
                >
                  {language}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}