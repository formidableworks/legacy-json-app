# monaco files

Documenting this because its an unusual approach.

- [monaco-editor](https://microsoft.github.io/monaco-editor/) distributes its primary source files as esm (modern import/export syntax). -- quite rare most modules stick with commonjs/amd for compatibility.
- create-react-app@**3.4.0**'s build pipeline (babel) does not process esm dependencies (It isnt configured to handle newer language constructs). Newer versions of create-react-app work fine.
- [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) is a react wrapper around the monaco editor; its loader only supports the new esm style import.

However [@monaco-editor/react](https://github.com/suren-atoyan/monaco-react) has an "escape hatch"; it can load amd/commonjs modules from CDNs.

CDNs are a no-go, but we can host the files ourselves:

1. The monaco-editor files (commonjs) can be copied to create-react-app's public dir.
1. @monaco-editor/react's loader will pointed to the public dir and it will only load the components and workers its configuration requires.

in this repo copying the `node_modules/monaco-editor/dev/vs` dir into `public/monaco_files` is done via the postinstall script in package.json.
