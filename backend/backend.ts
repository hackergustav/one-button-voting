// oak_server.ts

import { Application, Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";

const app = new Application();
const router = new Router();

const categories = [
  "A",
  "B"
]

const teams = [
  "teama",
  "teamb"
]

const votes: {
  teamId: string,
  category: string,
  voter: string
}[] = []

var currentCategoryIndex: number | undefined = undefined
var currentTeamIndex: number | undefined = undefined

router.post("/vote", async (ctx) => {

  if (!currentCategoryIndex || !currentTeamIndex) {
    ctx.response.status = 400;
    ctx.response.body = {
      error: "Voting isn't open!!",
    };
    return;
  }

  votes.push(
    {
      teamId: teams[currentTeamIndex],
      category: categories[currentCategoryIndex],
      voter: ctx.request.ip
    }
  )
  ctx.response.status = 200;
  console.log(votes)
});

router.post("/next", async (ctx) => {
  if (currentCategoryIndex == undefined || currentTeamIndex == undefined) {
    currentCategoryIndex = 0
    currentTeamIndex = 0
    console.log("category:" + currentCategoryIndex)
    console.log("team: " + currentTeamIndex)
    return
  }

  if (currentCategoryIndex >= categories.length - 1) {
    currentCategoryIndex = 0
    currentTeamIndex++

    if (currentTeamIndex >= teams.length) {
      console.log("Voting finished")
      currentCategoryIndex = undefined
      currentTeamIndex = undefined
      votingFinished()
      return;
    }

    console.log("category:" + currentCategoryIndex)
    console.log("team: " + currentTeamIndex)
    return
  }

  currentCategoryIndex++
  console.log("category:" + currentCategoryIndex)
  console.log("team: " + currentTeamIndex)

});

function votingFinished() {

}

app.use(router.routes());
app.use(router.allowedMethods());

console.log("Oak server running at http://localhost:8000");
await app.listen({ port: 8000 });