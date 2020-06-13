# My Pets App
# Developers
    Robert Anibal Ledezma  | Guillem Millan Lerin

## Description
  An app where pet owners can find the nearest places to walk and have a great time with her pet. 

## User Stories
- **home page** User can see little description about the app and can find places and parks to walk with her pets. Also the user can see the signup and login button.
- **signup** -As a user I want to login with a defined role inside the app and add my pets
- **login** -As a user i want to login in the page and edit my information and became part of the comunity
- **logout** As a user i want to be able to logout in any moment 
- **places** As a user I want to find all the places nearest my zone and add my favorite places in my profile.
- **places information** As a user I want to well known the information about the place and see all the characteristics to see if is a greate place for me.
- **places create** As a user I want to add new places of interes to have greate time with pets.
- **pets** As a user I want to have all my pets inside the app and add information and photos. 


## Backlog

## Routes
|Method|URL|Description

GET | / |  users and non users can see recomended places

POST | / |  users and non users cand find nearest places only typing the postal code  

GET | /places | user can see all the places

GET | /places/:id | user can see places details

GET | /aboutus | users can find all the information about the app 

GET | /contact | users can find all the channels of communication of the app

POST | /contact |  user can contact to get info or solve any problem about the app

GET | /signup | User can  see the diferent roles inside the app and define her own role in the app. Redirect if user is loged to /

POST | /signup | the user define her role inside the app

GET | /signup/typeofuser |  user have access to the form. Redirect if user is loged
POST | /signup/typeofuser | the user add all the infromation required 



GET | /login | user see the login form or redirect to /profile if user is loged
POST | /login | user logs in app or redirect to /profile if user is loged


GET | /user | user can find all her favortite places
GET | /user/porfile | can see all the information
POST | /user/porfile/edit | can change profile information including the location



## MODELS

User models
- username: String
- password: String
- image: String
- location: String
- pets: Array

Pets 
- name: String
- image: String
- age: String
- breed: String

Place
- type: Array String 
- name: String
- location: String
- dimension: String
- image: String


## Wireframe
### INDEX
![index](https://raw.githubusercontent.com/guillemmillan/mypetapp/master/wireframe/Index.jpg)

### CONTACT
![Contact](https://raw.githubusercontent.com/guillemmillan/mypetapp/master/wireframe/CONTACT.jpg)
### LOGIN
![login](https://raw.githubusercontent.com/guillemmillan/mypetapp/master/wireframe/Login.jpg)

### ABOUT US
![about us](https://raw.githubusercontent.com/guillemmillan/mypetapp/master/wireframe/About%20Us.jpg)








