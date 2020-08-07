package de.belmega.databaselearninggame

import de.belmega.databaselearninggame.model.HighscoreRequest
import de.belmega.databaselearninggame.model.HighscoreResponse
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/highscore")
class HighscoreController (
   val highscoreRepository: HighscoreRepository
) {

    @GetMapping
    fun getHighscore(): List<HighscoreResponse> {
        return highscoreRepository.findByOrderByScore().map{
            HighscoreResponse(
                    player = it.playerName,
                    score = it.score
            )
        }
    }

    @PostMapping
    fun addHighscore(
            @RequestBody highscoreRequest: HighscoreRequest
    ) {
        highscoreRepository.save(Highscore(
                playerName = highscoreRequest.playerName,
                score = highscoreRequest.score
        ))
    }

}
