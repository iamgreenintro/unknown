# Unknown

## Running (and testing) applications, servers and libraries inside the workspace:

The Nx workspace has a base `package.json` file where scripts are mentioned to serve the applications, run unit tests for the applications and run e2e tests for the applications.

A general rule of thumb is that all projects have their own `:start`, `:unit-test` and `:e2e-test` suffix, which might look like the following:

```json
{
  "scripts": {
    "administrator:start": "nx serve app-administrator",
    "administrator:unit-test": "nx test app-administrator",
    "administrator:e2e-test": "nx e2e app-administrator-e2e",
    "express:start": "nx serve server-express",
    "express:unit-test": "nx test server-express",
    "express:e2e-test": "nx e2e server-express-e2e",
    "libs:state-stores:test": "nx test state-stores",
    "libs:list-and-table-views:test": "nx test list-and-table-views"
  }
}
```

To serve or test the **app-administrator** application inside the `/apps` directory you would then any of the following commands:

```sh
npm run administrator:start
npm run administrator:unit-test
npm run administrator:e2e-test
```

## Managing environment variables:

Each application can have multiple `.env` files. These **must** be located in the root directory of the application for Nx to process them correctly.
This saves setting up extra configuration or using third-party packages only to have `.env` files in a subdirectory.

## Nx CLI:

### Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new component, use:

```sh
npx nx g @nx/angular:component component_name
```

To generate a new application, use:

```sh
npx nx g @nx/angular:app app_name
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib libs/lib_name (and optionally chain --tags=scope:scopename)
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

### Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/angular-monorepo-tutorial?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
