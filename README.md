# Q-CV

## 📌 - Description

Q-CV is a Software made in the Project Software Engineering and Media Computing Course at Esslingen University with the QUANTO Solutions Company.
The Software was made using the MERN-Stack and Keycloak for the Authentication.
The Software allows Users to Enter and manage User, Educations, Careers, IT-Skills and Project Data and Create CV's based on this Data.
Administrators have the ability to create and manage Users which can access the Software.

## ⚙️ - Installation Guide

1. Clone the Git-Repository.

```
foo@bar:~$ git clone https://github.com/FreakeyPlays/Q-CV.git
```

2. Install Docker, Docker-Compose and WSL2.<br>
   https://www.docker.com/products/docker-desktop/
3. If `make` is not provided in your OS, install a custom make like GNUmake.<br>
   https://www.gnu.org/software/make/
4. If you don't have the provided Files of the Software (.env Files and .json Files) continue with Step 8.
5. Populate the Project with the provided Files.
   - Paste the corresponding dev.env and production.env inside of `/config`, `/client/config` and `/server/config`.<br>
     To find out which .env-File belongs in which Folder, just look at the Variables in the .env_example and the .env-Files.
   - Replace the `master-realm.json` and the `Q-CV-realm.json` in the `/realm-config` Folder.
6. Make sure you are in the Root Directory of the Repository, then build and run the Develop or Production Profile.[^1]

```
foo@bar:~/Q-CV$ make build-[dev|production]
foo@bar:~/Q-CV$ make run-[dev|production]
```

7. Now you can access the Software based on your defined Address and Port.<br>
   In the dev-Environment, for example:
   `http://127.0.0.1:3000`
8. Create the `[dev|production].env`[^1] Files in the config Folders according to the .env_sample and the [.env Files](#%EF%B8%8F---env-files) declaration.
   - The KC_CLIENT_SECRET inside `/server/config/[dev|production].env`[^1] will be populated later.
9. Enter the `Q-CV` Folder and Build the Develop or Production Profile.[^1]

```
foo@bar:~$ cd Q-CV/
foo@bar:~/Q-CV$ make build-[dev|production]
```

10. After Building, serve the according Profile.[^1]

```
foo@bar:~/Q-CV$ make run-[dev|production]
```

11. Connect to your Keycloak Server by accessing your Address with the Keycloak Port defined in the .env file.<br>
    Example:
    `http://127.0.0.1:8080`
12. Retrieve the new Client Secret from the Keycloak Server.
    - Login using the Username and Password from the env file in `/server/config/[dev|production].env`[^1].
    - Make sure you are inside the `Master` Realm (Check the name in the Top-Left corner).
    - Navigate to the Clients Section on the Left Side.
    - Select `admin-cli` in the Clients List.
    - Navigate to the `Credentials` section of the admin-cli.
    - Click the `Regenerate Secret` Button.
    - Copy the Secret from the Text field.
    - Save the Client Secret inside your `/server/config/[dev|production].env`[^1] in the KC_CLIENT_SECRET variable.
13. After setting the KC_CLIENT_SECRET restart the Containers.[^1]

```
foo@bar:~/Q-CV$ make stop-[dev|production]
foo@bar:~/Q-CV$ make run-[dev|production]
```

14. Now you can access the Software based on your defined Address and Port.<br>
    Example:
    `http://127.0.0.1:3000`

## 🛠️ - .env Files

### /client/config/

| Name               | Description                                                                                                   |  Environment   |
| ------------------ | ------------------------------------------------------------------------------------------------------------- | :------------: |
| REACT_APP_URL      | This Variable defines the Address where our Frontend gets served. The Default Value is `localhost/127.0.0.1`. | dev/production |
| REACT_APP_API_PORT | This Variable defines the Port where our Frontend gets served. The Default Value is `3000`.                   | dev/production |

### /server/config/

| Name             | Description                                                                                                                                                           |  Environment   |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------: |
| MONGO_URI        | This Variable contains the Connection String to the MongoDB Cluster where the Data will be saved in. (String needs to contain the Username, Password and Clustername) | dev/production |
| PORT             | This Variable defines the Port where our Backend gets served. The Default Value is `5000`.                                                                            | dev/production |
| KC_CLIENT_SECRET | This Variable contains the Client Secret, which Kecloak needs to validate our API Requests.                                                                           | dev/production |
| KC_URI           | This Variable defines the Address where our Keycloak gets served. The Default Value is `keycloak`.                                                                    | dev/production |
| KC_PORT          | This Variable defines the Port where our Keycloak gets served. The Default Value is `8080`.                                                                           | dev/production |

### /config/

| Name                    | Description                                                                                               |  Environment   |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | :------------: |
| KEYCLOAK_ADMIN          | This Variable defines the Username to log in the Admin Console of Keycloak. The Default Value is `admin`. | dev/production |
| KEYCLOAK_ADMIN_PASSWORD | This Variable defines the Password to log in the Admin Console of Keycloak. The Default Value is `admin`. | dev/production |

[^1]: `[dev|production]` means to choose either dev or production. If you want to run for example the dev-Environment, please enter all commands/file names with the dev prefix.
