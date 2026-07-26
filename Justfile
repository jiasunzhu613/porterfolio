set shell := ["bash", "-cu"]

site_dir := "site"

default:
    @just --list

# Start Hugo's development server with live reload.
preview:
    hugo server --source {{site_dir}} --themesDir themes --buildDrafts --buildFuture

# Build the production site into site/public.
build:
    hugo --source {{site_dir}} --themesDir themes --minify --gc --cleanDestinationDir

# Remove Hugo's generated output for this site.
clean:
    rm -rf {{site_dir}}/public {{site_dir}}/resources

# Create a new blog post.
new path:
    hugo new "{{site_dir}}/content/blog/{{path}}.md"
