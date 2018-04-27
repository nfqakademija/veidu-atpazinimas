<?php declare(strict_types = 1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Migrations\AbstractMigration;
use Doctrine\DBAL\Schema\Schema;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
class Version20180427100736 extends AbstractMigration
{
    public function up(Schema $schema)
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE attendance (lecture_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', student_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', attended TINYINT(1) NOT NULL, INDEX IDX_6DE30D91CB944F1A (student_id), PRIMARY KEY(lecture_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE `group` (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', title VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE lecture (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', module_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', title VARCHAR(255) NOT NULL, start DATETIME NOT NULL, end DATETIME NOT NULL, INDEX IDX_C1677948AFC2B591 (module_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE module (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', lecturer_id INT DEFAULT NULL, title VARCHAR(255) NOT NULL, INDEX IDX_C242628BA2D8762 (lecturer_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE module_group (module_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', group_id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', INDEX IDX_64CC34ABAFC2B591 (module_id), INDEX IDX_64CC34ABFE54D947 (group_id), PRIMARY KEY(module_id, group_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE student (id CHAR(36) NOT NULL COMMENT \'(DC2Type:guid)\', group_id CHAR(36) DEFAULT NULL COMMENT \'(DC2Type:guid)\', name VARCHAR(255) NOT NULL, face VARCHAR(255) NOT NULL, INDEX IDX_B723AF33FE54D947 (group_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(254) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
        $this->addSql('ALTER TABLE attendance ADD CONSTRAINT FK_6DE30D9135E32FCD FOREIGN KEY (lecture_id) REFERENCES lecture (id)');
        $this->addSql('ALTER TABLE attendance ADD CONSTRAINT FK_6DE30D91CB944F1A FOREIGN KEY (student_id) REFERENCES student (id)');
        $this->addSql('ALTER TABLE lecture ADD CONSTRAINT FK_C1677948AFC2B591 FOREIGN KEY (module_id) REFERENCES module (id)');
        $this->addSql('ALTER TABLE module ADD CONSTRAINT FK_C242628BA2D8762 FOREIGN KEY (lecturer_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE module_group ADD CONSTRAINT FK_64CC34ABAFC2B591 FOREIGN KEY (module_id) REFERENCES module (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE module_group ADD CONSTRAINT FK_64CC34ABFE54D947 FOREIGN KEY (group_id) REFERENCES `group` (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE student ADD CONSTRAINT FK_B723AF33FE54D947 FOREIGN KEY (group_id) REFERENCES `group` (id)');
    }

    public function down(Schema $schema)
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('ALTER TABLE module_group DROP FOREIGN KEY FK_64CC34ABFE54D947');
        $this->addSql('ALTER TABLE student DROP FOREIGN KEY FK_B723AF33FE54D947');
        $this->addSql('ALTER TABLE attendance DROP FOREIGN KEY FK_6DE30D9135E32FCD');
        $this->addSql('ALTER TABLE lecture DROP FOREIGN KEY FK_C1677948AFC2B591');
        $this->addSql('ALTER TABLE module_group DROP FOREIGN KEY FK_64CC34ABAFC2B591');
        $this->addSql('ALTER TABLE attendance DROP FOREIGN KEY FK_6DE30D91CB944F1A');
        $this->addSql('ALTER TABLE module DROP FOREIGN KEY FK_C242628BA2D8762');
        $this->addSql('DROP TABLE attendance');
        $this->addSql('DROP TABLE `group`');
        $this->addSql('DROP TABLE lecture');
        $this->addSql('DROP TABLE module');
        $this->addSql('DROP TABLE module_group');
        $this->addSql('DROP TABLE student');
        $this->addSql('DROP TABLE user');
    }
}
