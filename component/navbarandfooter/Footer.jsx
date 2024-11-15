import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer
      className="w-full bg-gray-900"
      style={{
        padding: "15px",
      }}
    >
      <section className="max-w-5xl mx-auto text-white flex flex-col">
        <div className="">
          <Link href={"/"} className="flex items-center">
            <Image
              className="w-[4rem]"
              src="/assets/logo/logo.png"
              alt="Logo"
              width={60}
              height={60}
            />

            <span
              className="ml-1 text-xl font-bold md:block hidden"
              style={{
                color: "#497fc5",
              }}
            >
              Infinite firms
            </span>
          </Link>
        </div>
        <div
          className="flex flex-col sm:flex-row justify-between"
          style={{
            gap: "2rem",
          }}
        >
          <p
            style={{
              maxWidth: "300px",
              padding: "4px",
            }}
          >
            Founded in 2016, we specialize in providing cutting-edge copy
            trading and cloud mining solutions. Our platform offers users the
            opportunity to seamlessly engage in cryptocurrency mining and
            automated trading, ensuring a secure and user-friendly experience.
          </p>
          <div>
            <h3 className="font-semibold text-2xl">Reach Us</h3>
            <p>
              <a href="#">Email: info@infinitefirms.com</a>
            </p>
            <p>
              <a href="#">Address: 30 JFK Blvd, Jersey city, NJ, 07304</a>
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-2xl">Pages</h3>
            <p>
              <Link href="#" className="hover:text-blue-600">
                About Us
              </Link>
            </p>
            <p>
              <Link href="/faq/contactus" className="hover:text-blue-600">
                Contact Us
              </Link>
            </p>
            <p>
              <Link href="/faq/services" className="hover:text-blue-600">
                Services
              </Link>
            </p>
            <p>
              <Link
                href="/faq/termsandcondition"
                className="hover:text-blue-600"
              >
                Terms and condition
              </Link>
            </p>
            <p>
              {/* <Link href="#">Address: 123 Main St, City, State, Zip</Link> */}
            </p>
          </div>

          <div>
            {/* <p
              style={{
                maxWidth: "250px",
                padding: "4px",
              }}
            >
              All materials and services provided on this Horizonmarketcapital
              are subject to copyright and belong to "Horizon Market capital".
              <br />
              In case of violation, they will be prosecuted in accordance with
              legislation of the intellectual property protection. Prime
              Exchange Rate is regulated by CySEC with registration number 44699
              IBB 0014. All activities on this website is provided by Prime
              Exchange Rate.
            </p> */}
          </div>
        </div>
        <hr />
        <div
          className="flex flex-col justify-center items-center"
          style={{
            padding: "10px",
          }}
        >
          <p className="text-sm">
            &copy; {new Date().getFullYear()} infinitefirms. All rights
            reserved.
          </p>
          <div>
            <Link href="#">Terms & Conditions</Link>
          </div>
        </div>
      </section>
    </footer>
  );
};
export default Footer;
