import Footer from "@/components/footer";
import { GlobalProvider } from "../components/context";
import { Navigation } from "../components/navigation";
import "./globals.css";

//Dynamic metadata generating
export async function generateMetadata() {
  const param_data = await fetch(process.env.NEXT_PUBLIC_URL + `/wp-json`).then(
    (res) => res.json()
  );

  return {
    title: param_data.name + " - Homepage",
    description: "Author",
  };
}

//Fetch functions
async function getData() {
  //All data fetching
  const all_data_request = await fetch(
    process.env.NEXT_PUBLIC_URL + "/wp-json"
  ); //All data fetch
  const all_data = await all_data_request.json(); //All data of rest api

  //Logo and Site functions
  const site_name = all_data.name; //Site name
  const site_logo_url =
    all_data._links["wp:featuredmedia"] &&
    all_data._links["wp:featuredmedia"]["0"].href; //Site logo url
  const site_logo_request = site_logo_url && (await fetch(site_logo_url)); //Site logo fetch
  const site_logo_data = site_logo_request && (await site_logo_request.json()); //Site logo data

  //Categories fetching
  const categories_request = await fetch(
    process.env.NEXT_PUBLIC_URL + "/wp-json/wp/v2/categories?per_page=100"
  );
  const categories_data = await categories_request.json();

  return { all_data, site_name, site_logo_data, categories_data };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  return (
    <GlobalProvider testvalue={data}>
      <html lang="en">
        <body>
          <Navigation />
          <div className="mt-[100px] min-h-[70vh]">{children}</div>
          <Footer />
        </body>
      </html>
    </GlobalProvider>
  );
}
