# Notes


## TODO
- group by company
- make logs
- loading, styling and animation
-

## Vercel Server deployment only on main branch
- go to project on vercel
- go to setting -> git -> Ignored Build Step
- set custom then type:
```
[ "$VERCEL_GIT_COMMIT_REF" != "main" ] && echo "Skipping deploy for branch $VERCEL_GIT_COMMIT_REF" && exit 0
```