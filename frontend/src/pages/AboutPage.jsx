import { FaLinkedin, FaTwitter } from "react-icons/fa";

const TeamMembers = [
  {
    id: 1,
    name: 'Suraj Kumar',
    imageUrl: 'https://shorturl.at/nrsNW', 
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
    
  },
  {
    id: 2,
    name: 'Kauhal Kishor',
    imageUrl: 'https://shorturl.at/nrsNW', 
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/kaushal-kishor-16ba9b1bb/',
      twitter: 'https://twitter.com/johndoe',
    },
    
  },
  
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 mt-8 items-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">About Our Project</h1>
        <p className="text-lg mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in ex nisi. Integer interdum fermentum augue vel cursus.
        </p>

        <h2 className="text-2xl font-bold mb-4">Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TeamMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg p-6">
              <img src={member?.imageUrl} alt={member.name} className="h-32 w-32 rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">{member.name}</h3>
              <div className="flex justify-center space-x-4">
                <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin text-blue-500 hover:text-blue-700">
                    <FaLinkedin className="text-3xl"/>
                  </i>
                </a>
                <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <FaTwitter className="text-3xl"/>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default AboutPage;

