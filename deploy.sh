# not working
#buster setup --gh-repo="https://github.com/ampersd/blog.git"
#buster deploy

BLOG_REPO_LOCAL_DIR="/Users/tonykorepanov/Projects/repositoriesGithub/blog"
cd $BLOG_REPO_LOCAL_DIR/

# копируем этот файл
mv .git ../.git
mv CNAME ../CNAME

# удаляем содержимое репозитория
# git rm -rf .
rm -rf .
# генерируем с запущенного движка ghost статичный сайт в папку static
buster generate

# перемещаем из static в корневой каталог
mv static/* ./
# совершаем обратную операцию
mv ../CNAME CNAME
mv ../.git .git
# удаляем пустой каталог
rmdir static


# TODO папка static не удаляется, из-за этого куча говно-мусора, пока все равно лучше ручками перемещать и деплоить
# git add -A && git commit -m "`date`"
# git push
