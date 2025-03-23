import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      link: "williamalexander1603@gmail.com",
      action: "mailto:"
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      title: "LinkedIn",
      link: "linkedin.com"
    },
    {
      icon: <SiGithub className="h-5 w-5" />,
      title: "GitHub",
      link: "https://github.com/PolarDyth"
    }
  ]

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 my-8 sm:my-12 md:my-20 text-center px-4 sm:px-6">
      <h2 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
        Let&apos;s Work Together
      </h2>
      <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
        Have a project in mind or just want to connect? Feel free to reach out!
      </p>
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-center mx-auto gap-8 lg:gap-14 mt-8 max-w-3xl">
        {/* Contact Info */}
        <div className="space-y-4 sm:space-y-6 w-full lg:w-auto">
          {contactInfo.map((prop, index) => (
            <div key={index}>
              <div className="flex items-center gap-3 sm:gap-4 text-left">
                <Link 
                  href={prop.action ? prop.action + prop.link : "https://" + prop.link} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/20 p-3 sm:p-4 rounded-lg text-primary hover:bg-primary/50 hover:text-foreground transition-colors hover:scale-110 transform duration-200"
                >
                  {prop.icon}                
                </Link>
                <div>
                  <h3 className="font-medium text-sm sm:text-base">{prop.title}</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm truncate max-w-[180px] sm:max-w-[220px]">
                    {prop.link}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Contact Form */}
        <form className="space-y-3 sm:space-y-4 w-full lg:w-1/2 mt-8 lg:mt-0">
          <Input 
            type="text" 
            placeholder="Your Name" 
            className="h-10 sm:h-11"
          />
          <Input 
            type="email" 
            placeholder="Your Email" 
            className="h-10 sm:h-11"
          />
          <Textarea 
            placeholder="Your Message" 
            rows={4} 
            className="min-h-[100px] sm:min-h-[120px]"
          />
          <Button 
            className="w-full cursor-pointer h-10 sm:h-11 mt-2"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  )
}