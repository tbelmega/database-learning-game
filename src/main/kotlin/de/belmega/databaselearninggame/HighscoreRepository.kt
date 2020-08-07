package de.belmega.databaselearninggame

import de.belmega.databaselearninggame.model.HighscoreResponse
import org.hibernate.annotations.GenericGenerator
import org.springframework.boot.autoconfigure.domain.EntityScan
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.persistence.*

@Repository
interface HighscoreRepository: CrudRepository<Highscore, Long> {
    fun findByOrderByScore(): List<Highscore>
}

// no data class, since JPA is not designed to work with immutable classes, and generated equals()/hashCode()
@Entity
class Highscore(
        @Id
        @GeneratedValue(generator = "native")
        @GenericGenerator(name = "native", strategy = "native")
        val id: Long? = null,
        val playerName: String,
        val score: Long
)
