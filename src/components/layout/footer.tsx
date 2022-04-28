import * as React from 'react';

const Footer = () => {
  return (
    <>
      <div className="bg-primary-75 w-full py-30">
        <div className="container mx-auto text-white flex justify-between">
          <div>
            <ul>
              <li><span className="font-bold text-30">Desocial</span></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-10"><span className="font-bold">About Us</span></li>
              <li className="mb-5"><span className="font-medium">Road Map</span></li>
              <li className="mb-5"><span className="font-medium">Team Members</span></li>
              <li><span className="font-medium">Team Culture</span></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-10"><span className="font-bold">About Project</span></li>
              <li className="mb-5"><span className="font-medium">Faq</span></li>
              <li className="mb-5"><span className="font-medium">Policy</span></li>
              <li><span className="font-medium">Assignment</span></li>
            </ul>
          </div>
          <div>
            <ul>
              <li className="mb-10"><span className="font-bold">Social Link</span></li>
              <li className="mb-5"><span className="font-medium">Telegram</span></li>
              <li className="mb-5"><span className="font-medium">Instagram</span></li>
              <li><span className="font-medium">Discord</span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
