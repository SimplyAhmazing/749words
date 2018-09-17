#![feature(plugin)]
#![feature(custom_derive)]
#![plugin(rocket_codegen)]


#[macro_use] extern crate serde_derive;

// use diesel::prelude::SqliteConnection;
extern crate rocket;
extern crate rocket_contrib;

// use rocket_contrib::StaticFiles;
// use rocket_contrib::static_files::StaticFiles;
use rocket::response::NamedFile;
// use rocket::request::LenientForm;
use rocket_contrib::Json;

use std::io;
use std::path::{Path, PathBuf};

use self::lib::*;

lazy_static! {
    pub static ref DB_CONN : SqliteConnection = establish_connection()
}

// create_connection()

#[get("/")]
fn index() -> io::Result<NamedFile> {
    NamedFile::open("static/index.html")
}

#[derive(Deserialize)]
struct Entry {
    body: String,
    title: String,
    date: String
}

#[post("/save", format = "application/json", data = "<entry>")]
fn post_handler(entry: Json<Entry>) -> String {
    // use lib::*;
    // println!("{}", entry.body)

    println!("{}", entry.body);
    "done".to_string()
}

#[get("/<file..>")]
fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).ok()
}


fn rocket() -> rocket::Rocket {
    rocket::ignite().mount("/", routes![index, files, post_handler])
}

fn main() {
    rocket().launch();
}
