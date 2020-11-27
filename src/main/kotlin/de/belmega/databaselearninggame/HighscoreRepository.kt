package de.belmega.databaselearninggame

import org.hibernate.annotations.GenericGenerator
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Repository
interface HighscoreRepository: CrudRepository<Highscore, Long> {
    fun findByOrderByScoreDesc(): List<Highscore>
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
