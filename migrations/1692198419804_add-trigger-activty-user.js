exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    CREATE OR REPLACE FUNCTION log_playlist_activity() RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.action = 'add' THEN
            INSERT INTO playlist_song_activities (user_id, playlist_id, song_id, action, time)
            VALUES (NEW.user_id, NEW.playlist_id, NEW.song_id, 'added', NEW.time);
        ELSIF NEW.action = 'remove' THEN
            INSERT INTO playlist_song_activities (user_id, playlist_id, song_id, action, time)
            VALUES (NEW.user_id, NEW.playlist_id, NEW.song_id, 'removed', NEW.time);
        END IF;
        RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TRIGGER playlist_activity_trigger
    AFTER INSERT ON playlist_activity
    FOR EACH ROW
    EXECUTE FUNCTION log_playlist_activity();
  `);
};

exports.down = (pgm) => {
  pgm.sql(`
    DROP TRIGGER IF EXISTS playlist_activity_trigger ON playlist_activity;
    DROP FUNCTION IF EXISTS log_playlist_activity();
  `);
};
